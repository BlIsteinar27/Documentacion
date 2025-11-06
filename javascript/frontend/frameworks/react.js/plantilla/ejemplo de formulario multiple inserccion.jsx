import React, { useState } from 'react';
import Modal from '../Modal';
import { errorAlert, successAlert } from '../../utils/sweetAlerts';
import { buildApiUrl } from '../../config';
import Button from '../Button';

const ModalCrearEstatus = ({ onShow, onClose, onSave }) => {
  const [tipoContexto, setTipoContexto] = useState('');
  const [estatusRows, setEstatusRows] = useState([
    { nombre: '', tempId: Date.now() }
  ]);

  // Validación básica del formulario
  const validateForm = () => {
    if (!tipoContexto.trim()) {
      errorAlert('El tipo de contexto es obligatorio.');
      return false;
    }
    const hasEmpty = estatusRows.some(row => !row.nombre.trim());
    if (hasEmpty) {
      errorAlert('Todos los nombres de estatus son obligatorios.');
      return false;
    }
    return true;
  };

  // Manejar cambios en los inputs de estatus
  const handleEstatusChange = (index, e) => {
    const { value } = e.target;
    setEstatusRows(prev =>
      prev.map((row, i) => (i === index ? { ...row, nombre: value } : row))
    );
  };

  // Agregar nueva fila
  const handleAddEstatus = () => {
    setEstatusRows(prev => [...prev, { nombre: '', tempId: Date.now() }]);
  };

  // Eliminar fila
  const handleRemoveEstatus = (tempId) => {
    if (estatusRows.length === 1) return; // No permitir dejar vacío
    setEstatusRows(prev => prev.filter(row => row.tempId !== tempId));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const apiUrl = buildApiUrl('estatus');

      // Preparar datos para el backend
      const estatusData = estatusRows.map(row => ({
        nombre: row.nombre.trim(),
        tipo_contexto: tipoContexto.trim()
      }));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ estatus: estatusData })
      });

      const result = await response.json();

      if (response.ok) {
        onSave();
        // Resetear formulario
        setTipoContexto('');
        setEstatusRows([{ nombre: '', tempId: Date.now() }]);
        successAlert(result.message || 'Estatus creados exitosamente.');
      } else {
        const errorMsg = result.message || result.error || 'Error al crear los estatus.';
        errorAlert(errorMsg);
      }
    } catch (error) {
      console.error('Error de red:', error);
      errorAlert('No se pudo conectar con el servidor', { title: 'Error de red' });
    }
  };

  return (
    <Modal
      onShow={onShow}
      onClose={onClose}
      titulo="Crear Estatus"
      sizeModal="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de contexto (ej: EVENTO, COMPRA)</label>
          <input
            type="text"
            className="form-control"
            value={tipoContexto}
            onChange={(e) => setTipoContexto(e.target.value)}
            placeholder="Ej: EVENTO"
          />
        </div>

        <hr className="my-4" />
        <h5>Estatus <button type="button" className="btn btn-sm btn-success ms-2" onClick={handleAddEstatus}>+ Agregar</button></h5>

        {estatusRows.map((row, index) => (
          <div key={row.tempId} className="border p-3 mb-3 rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Estatus #{index + 1}</h6>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleRemoveEstatus(row.tempId)}
                disabled={estatusRows.length === 1}
                aria-label="Eliminar"
              ></button>
            </div>
            <div className="mb-2">
              <label className="form-label small">Nombre del estatus</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={row.nombre}
                onChange={(e) => handleEstatusChange(index, e)}
                placeholder="Ej: Activo, Cancelado..."
              />
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Crear
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCrearEstatus;