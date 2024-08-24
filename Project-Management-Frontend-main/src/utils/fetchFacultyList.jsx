
export const fetchFacultyList = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'api/facultyRoutes/getAllFaculty', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch faculty list');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching faculty list:', error);
      throw error;
    }
  };
  