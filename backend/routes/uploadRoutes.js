const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadImages } = require('../middleware/upload');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Route pour uploader des images de professionnel
router.post('/professional/images', auth, uploadImages, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Vérifier que l'utilisateur est un professionnel
    const user = await User.findById(userId);
    if (!user || user.userType !== 'professionnel') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seuls les professionnels peuvent uploader des images' 
      });
    }

    // Vérifier qu'il y a des fichiers uploadés
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Aucune image n\'a été uploadée' 
      });
    }

    // Préparer les URLs des images
    const imageUrls = req.files.map(file => ({
      url: `/uploads/images/${file.filename}`,
      originalName: file.originalname
    }));

    // Ajouter les images au profil du professionnel
    if (!user.businessInfo.images) {
      user.businessInfo.images = [];
    }
    
    user.businessInfo.images.push(...imageUrls);
    await user.save();

    res.json({
      success: true,
      message: 'Images uploadées avec succès',
      images: imageUrls
    });

  } catch (error) {
    console.error('Erreur upload images:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de l\'upload' 
    });
  }
});

// Route pour supprimer une image
router.delete('/professional/images/:filename', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const filename = req.params.filename;
    
    // Vérifier que l'utilisateur est un professionnel
    const user = await User.findById(userId);
    if (!user || user.userType !== 'professionnel') {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès non autorisé' 
      });
    }

    // Supprimer l'image de la base de données
    if (user.businessInfo.images) {
      user.businessInfo.images = user.businessInfo.images.filter(
        image => !image.url.includes(filename)
      );
      await user.save();
    }

    // Supprimer le fichier du serveur
    const filePath = path.join(__dirname, '../uploads/images/', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      message: 'Image supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de la suppression' 
    });
  }
});

// Route pour récupérer les images d'un professionnel
router.get('/professional/:userId/images', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId).select('businessInfo.images');
    if (!user || user.userType !== 'professionnel') {
      return res.status(404).json({ 
        success: false, 
        message: 'Professionnel non trouvé' 
      });
    }

    res.json({
      success: true,
      images: user.businessInfo.images || []
    });

  } catch (error) {
    console.error('Erreur récupération images:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

module.exports = router;
