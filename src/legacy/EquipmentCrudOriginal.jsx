import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [echipamente, setEchipamente] = useState([]);
  const [formData, setFormData] = useState({ id: '', nume: '', tip: '' });

  // READ - Obținem echipamentele de la backend
  const fetchEchipamente = async () => {
    try {
      const response = await axios.get('/api/echipamente');
      setEchipamente(response.data);
    } catch (error) {
      console.error("Eroare la obținerea datelor:", error);
    }
  };

  useEffect(() => {
    fetchEchipamente();
  }, []);

  // CREATE - Adăugăm un echipament nou
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/echipamente', formData);
      setFormData({ id: '', nume: '', tip: '' }); // resetăm formularul
      fetchEchipamente(); // reîncărcăm lista
    } catch (error) {
      console.error("Eroare la adăugare:", error);
    }
  };

  // DELETE - Ștergem un echipament
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/echipamente/${id}`);
      fetchEchipamente(); // reîncărcăm lista
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestionare Echipamente (Aplicație de Start)</h1>
      
      {/* Formularul de adăugare */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="number" 
          placeholder="ID" 
          value={formData.id} 
          onChange={(e) => setFormData({ ...formData, id: e.target.value })} 
          required 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Nume Echipament" 
          value={formData.nume} 
          onChange={(e) => setFormData({ ...formData, nume: e.target.value })} 
          required 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Tip" 
          value={formData.tip} 
          onChange={(e) => setFormData({ ...formData, tip: e.target.value })} 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Adaugă</button>
      </form>

      {/* Lista de echipamente */}
      <h3>Lista Echipamente</h3>
      <ul>
        {echipamente.length === 0 ? (
          <p>Nu există echipamente în baza de date.</p>
        ) : (
          echipamente.map((echipament) => (
            <li key={echipament.id} style={{ marginBottom: '10px' }}>
              <strong>{echipament.id}</strong>: {echipament.nume} ({echipament.tip})
              <button 
                onClick={() => handleDelete(echipament.id)} 
                style={{ marginLeft: '15px', color: 'red' }}
              >
                Șterge
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;