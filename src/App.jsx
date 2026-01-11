// ... (all imports and other code above this line are the same)

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Listener remains simple and correct
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // CRITICAL FIX: Direct Check on window.location.hash for reliability
  // If the browser hash contains the admin path, render the AdminPage immediately.
  // This is the most reliable way to check the hash on a deployed static site.
  if (window.location.hash.includes('admin')) {
    return <AdminPage />;
  }

  // Fallback to state check (for when navigation happens after the initial load)
  if (currentHash.includes('admin')) {
    return <AdminPage />;
  }
  
  // If no admin path is found, render the main site.
  return (
    <div className="app">
      {/* ... (render all main site components) ... */}
    </div>
  );
}

export default App;