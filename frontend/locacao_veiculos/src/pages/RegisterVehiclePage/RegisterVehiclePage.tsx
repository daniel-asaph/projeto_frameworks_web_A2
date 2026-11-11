import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import type { CriarVeiculoPayload } from '../../types';
import './RegisterVehiclePage.css';

export interface RegisterVehiclePageProps {
  onRegisterVehicle?: (payload: CriarVeiculoPayload) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export function RegisterVehiclePage({ onRegisterVehicle }: RegisterVehiclePageProps) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const anoNumber = Number(ano);
    const valorDiariaNumber = Number(valorDiaria.replace(/\./g, '').replace(',', '.'));

    if (!Number.isInteger(anoNumber) || anoNumber < 1900 || anoNumber > CURRENT_YEAR + 1) {
      setError('Informe um ano válido.');
      return;
    }
    if (Number.isNaN(valorDiariaNumber) || valorDiariaNumber <= 0) {
      setError('O valor da diária deve ser maior que zero.');
      return;
    }

    setError('');
    onRegisterVehicle?.({
      marca: marca.trim(),
      modelo: modelo.trim(),
      placa: placa.trim().toUpperCase(),
      ano: anoNumber,
      valorDiaria: valorDiariaNumber,
    });
  };

  return (
    <section className="register-vehicle-page">
      <div className="register-vehicle-card">
        <div className="register-vehicle-header">
          <h1 className="register-vehicle-title">Cadastrar Veículo</h1>
          <p className="register-vehicle-subtitle">
            Vamos colocar seu veículo na estrada? Preencha os dados abaixo para começar.
          </p>
        </div>

        <form className="register-vehicle-form" onSubmit={handleSubmit}>
          <div className="register-vehicle-row">
            <div className="register-vehicle-field">
              <label className="register-vehicle-label" htmlFor="marca">Marca*</label>
              <Input
                id="marca"
                type="text"
                placeholder="Ex.: Toyota"
                className="register-vehicle-input"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </div>

            <div className="register-vehicle-field">
              <label className="register-vehicle-label" htmlFor="modelo">Modelo*</label>
              <Input
                id="modelo"
                type="text"
                placeholder="Ex.: Corolla"
                className="register-vehicle-input"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="register-vehicle-row">
            <div className="register-vehicle-field">
              <label className="register-vehicle-label" htmlFor="placa">Placa*</label>
              <Input
                id="placa"
                type="text"
                placeholder="Ex.: ABC1D23"
                className="register-vehicle-input"
                value={placa}
                maxLength={8}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="register-vehicle-field">
              <label className="register-vehicle-label" htmlFor="ano">Ano*</label>
              <Input
                id="ano"
                type="number"
                placeholder="Ex.: 2022"
                className="register-vehicle-input"
                value={ano}
                min={1900}
                max={CURRENT_YEAR + 1}
                onChange={(e) => setAno(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="register-vehicle-field">
            <label className="register-vehicle-label" htmlFor="valorDiaria">
              Valor da diária (R$)*
            </label>
            <Input
              id="valorDiaria"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 180,00"
              className="register-vehicle-input"
              value={valorDiaria}
              onChange={(e) => setValorDiaria(e.target.value)}
              required
            />
          </div>

          {error && <p className="register-vehicle-error">{error}</p>}

          <div className="register-vehicle-footer">
            <Button type="submit" className="register-vehicle-submit-btn">
              Cadastrar Veículo
            </Button>
            <span className="register-vehicle-required-note">*Campos obrigatórios</span>
          </div>
        </form>
      </div>
    </section>
  );
}
