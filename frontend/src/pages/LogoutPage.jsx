import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate('/');
  }, []);

  return null;
}
export default LogoutPage;
