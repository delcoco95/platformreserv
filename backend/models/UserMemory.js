// Modèle User en mémoire pour le développement
class UserMemory {
  constructor(data) {
    this._id = this.generateId();
    this.email = data.email;
    this.password = data.password;
    this.userType = data.userType;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.companyName = data.companyName;
    this.profession = data.profession;
    this.siret = data.siret;
    this.phone = data.phone;
    this.address = data.address;
    this.preferences = data.preferences || {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
    };
    this.description = data.description;
    this.services = data.services || [];
    this.rating = data.rating || 0;
    this.totalReviews = data.totalReviews || 0;
    this.isVerified = data.isVerified || false;
    this.coordinates = data.coordinates;
    this.availability = data.availability || {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async save() {
    // Simuler l'enregistrement
    UserMemory.users.push(this);
    return this;
  }

  static users = [];

  static async findOne(query) {
    return this.users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  }

  static async findById(id) {
    return this.users.find(user => user._id === id);
  }

  static async find(query = {}) {
    return this.users.filter(user => {
      if (query.userType) return user.userType === query.userType;
      return true;
    });
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    const userIndex = this.users.findIndex(user => user._id === id);
    if (userIndex === -1) return null;
    
    const user = this.users[userIndex];
    Object.assign(user, updateData);
    user.updatedAt = new Date();
    
    return user;
  }
}

module.exports = UserMemory;
