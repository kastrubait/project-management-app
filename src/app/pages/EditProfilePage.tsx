import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { useAppSelector } from '../store/redux';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { userLogin, userId, userName } = useAppSelector((state) => state.header);

  return (
    <>
      <div className={styles.card}>
        <div>Your ID: {userId}</div>
        <div>Your Login: {userLogin}</div>
        <div>Your Name: {userName}</div>
      </div>
      <EditProfileForm />
    </>
  );
}
export default EditProfilePage;
