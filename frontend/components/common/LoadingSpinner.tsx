interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ 
  message = "Chargement...", 
  size = "md" 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div 
          className={`animate-spin ${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full mx-auto`}
        />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
