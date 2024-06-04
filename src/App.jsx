import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { DespachoNew } from './NuevoDespacho';
import { DetalleDespacho } from './DetalleDespacho';
import { Registro } from './Registro';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/despacho" element={<DespachoNew />} />
      <Route path="/detalledespacho" element={<DetalleDespacho />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}
