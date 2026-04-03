import { useMemo, useState } from 'react';
import { mockTaxis } from '../../data/mockTaxis';
import { Taxi, TaxiAvailability } from '../../types/taxi';

const availabilityOptions: Array<'All' | TaxiAvailability> = [
  'All',
  'Available',
  'Busy',
  'Offline',
];

function getAvailabilityClassName(status: TaxiAvailability) {
  if (status === 'Available') return 'taxi-status-available';
  if (status === 'Busy') return 'taxi-status-busy';
  return 'taxi-status-offline';
}

export default function TaxiSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState<
    'All' | TaxiAvailability
  >('All');

  const filteredTaxis = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return mockTaxis.filter((taxi: Taxi) => {
      const matchesSearch =
        query.length === 0 ||
        taxi.taxiName.toLowerCase().includes(query) ||
        taxi.driver.name.toLowerCase().includes(query) ||
        taxi.driver.phone.toLowerCase().includes(query) ||
        taxi.vehicle.type.toLowerCase().includes(query) ||
        taxi.vehicle.number.toLowerCase().includes(query) ||
        taxi.location.area.toLowerCase().includes(query);

      const matchesAvailability =
        selectedAvailability === 'All' ||
        taxi.availability === selectedAvailability;

      return matchesSearch && matchesAvailability;
    });
  }, [searchTerm, selectedAvailability]);

  return (
    <section className="tab-section">
      <div className="section-banner">
        <div>
          <span className="section-kicker">Local mobility</span>
          <h2>Taxi and driver directory</h2>
          <p>
            Search taxis by driver, area, vehicle, or availability and quickly
            contact the assigned driver.
          </p>
        </div>

        <div className="section-banner-card">
          <strong>{filteredTaxis.length}</strong>
          <span>Taxi listings visible</span>
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar-filters">
          <input
            type="text"
            className="input"
            placeholder="Search by taxi, driver, vehicle no, or area"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select"
            value={selectedAvailability}
            onChange={(e) =>
              setSelectedAvailability(e.target.value as 'All' | TaxiAvailability)
            }
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTaxis.length === 0 ? (
        <div className="empty-state">
          <h3>No taxis found</h3>
          <p>Try another search text or availability filter.</p>
        </div>
      ) : (
        <div className="taxi-grid">
          {filteredTaxis.map((taxi: Taxi) => (
            <article key={taxi.id} className="taxi-card">
              <div className="taxi-card-header">
                <div>
                  <span className="taxi-label">{taxi.vehicle.type}</span>
                  <h3>{taxi.taxiName}</h3>
                  <p className="taxi-subtitle">
                    {taxi.vehicle.number} • {taxi.vehicle.color} •{' '}
                    {taxi.vehicle.seats} seats
                  </p>
                </div>

                <span
                  className={`taxi-status-badge ${getAvailabilityClassName(
                    taxi.availability
                  )}`}
                >
                  {taxi.availability}
                </span>
              </div>

              <div className="taxi-driver-card">
                <img
                  src={taxi.driver.photo}
                  alt={taxi.driver.name}
                  className="taxi-driver-photo"
                />

                <div className="taxi-driver-info">
                  <h4>{taxi.driver.name}</h4>
                  <p>
                    {taxi.driver.experienceYears} years experience • Rating{' '}
                    {taxi.driver.rating}
                  </p>

                  <div className="chip-list">
                    {taxi.driver.language.map((language) => (
                      <span key={language} className="detail-chip">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="taxi-meta-grid">
                <div className="taxi-meta-card">
                  <span>Pickup Area</span>
                  <strong>{taxi.location.area}</strong>
                  <small>{taxi.location.landmark}</small>
                </div>

                <div className="taxi-meta-card">
                  <span>Base Fare</span>
                  <strong>₹{taxi.pricing.baseFare}</strong>
                  <small>₹{taxi.pricing.perKm}/km</small>
                </div>

                <div className="taxi-meta-card">
                  <span>Night Charge</span>
                  <strong>₹{taxi.pricing.nightCharge}</strong>
                  <small>
                    {taxi.vehicle.airConditioned ? 'AC enabled' : 'Non AC'}
                  </small>
                </div>
              </div>

              <div className="taxi-actions">
                <a href={`tel:${taxi.driver.phone}`} className="secondary-btn">
                  Call Driver
                </a>
                <a
                  href={`mailto:${taxi.driver.email}`}
                  className="primary-btn taxi-link-btn"
                >
                  Email Driver
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}