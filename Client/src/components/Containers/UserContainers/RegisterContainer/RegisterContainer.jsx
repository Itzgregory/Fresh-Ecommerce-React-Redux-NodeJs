import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../../';
import { registerUser } from '../../../../api';
import { alertFromServerResponse } from '../../../../Utils/index';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';

export function RegisterContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    
    const photo = data.photo[0];
    const maxSize = 5 * 1024 * 1024; 
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (photo.size > maxSize) {
      alert('File size must be less than 5MB');
      setIsLoading(false);
      return;
    }
    
    if (!allowedTypes.includes(photo.type)) {
      alert('File must be JPEG, PNG, or GIF');
      setIsLoading(false);
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === 'photo' ? value[0] : value);
    });

    try {
      const response = await registerUser(formData);
      alertFromServerResponse(response); 
      if (response.success) {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Registration failed:', error);
      handleError(error);
    } finally {
      setIsLoading(false);
      document.getElementById('formSign')?.reset();
    }
  };

  return (
    <div className="register-container">
      <SignUp 
        onBack={() => navigate('/')} 
        onRegister={handleRegister}
        isLoading={isLoading}
      />
    </div>
  );
}
