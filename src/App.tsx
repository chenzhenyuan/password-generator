
import Generator from './components/Generator';
import GeometricBackground from './components/Geometric';

function App() {
  return (
    <>
      <GeometricBackground />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem 1rem' }}>
        <Generator />
        <footer style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.875rem', textAlign: 'center' }}>
          © 2024 ~ {new Date().getFullYear()} 密码生成器. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default App;