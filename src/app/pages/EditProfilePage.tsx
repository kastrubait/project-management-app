import { useEffect } from 'react';
import { ApiService } from '../Api/ApiService';
import EditProfileForm from '../components/EditProfile/EditProfileForm';

function EditProfilePage() {
  useEffect(() => {
    ApiService.getAllUsers();
  }, []);
  return (
    <>
      <div>EditProfilePage</div>
      <EditProfileForm />
    </>
  );
}
export default EditProfilePage;
