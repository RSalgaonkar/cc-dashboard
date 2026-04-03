import { useMemo, useState } from 'react';
import { mockUsers } from '../../data/mockUsers';
import { User, UserFormValues } from '../../types/user';
import { Taxi } from '../../types/taxi';
import UserToolbar from '../toolbar/UserToolbar';
import UserTable from '../table/UserTable';
import UserFormModal from '../form/UserFormModal';
import UserAnalytics from '../analytics/UserAnalytics';
import useThrottle from '../../hooks/useThrottle';
import { mockTaxis } from '../../data/mockTaxis';
import { mockHotels } from '../../data/mockHotels';
import { mockAlcoholProducts } from '../../data/mockAlcohol';
import TaxiSection from '../taxi/TaxiSection';

type DashboardTab = 'users' | 'taxis' | 'hotels' | 'alcohol';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('users');

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const [hotelSearch, setHotelSearch] = useState('');
  const [taxiSearch, setTaxiSearch] = useState('');
  const [alcoholSearch, setAlcoholSearch] = useState('');

  const throttledSearchTerm = useThrottle(searchTerm, 350);
  const throttledTaxiSearch = useThrottle(taxiSearch, 300);
  const throttledHotelSearch = useThrottle(hotelSearch, 300);
  const throttledAlcoholSearch = useThrottle(alcoholSearch, 300);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = throttledSearchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);

        const matchesRole = selectedRole === 'All' || user.role === selectedRole;
        const matchesStatus =
          selectedStatus === 'All' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
      });
    }, [users, throttledSearchTerm, selectedRole, selectedStatus]);

    const getTaxiSearchText = (taxi: Taxi) => {
    const possibleValues = [
      (taxi as any).driverName,
      (taxi as any).vehicleNumber,
      (taxi as any).vehicleType,
      (taxi as any).name,
      (taxi as any).number,
      (taxi as any).type,
      (taxi as any).status,

      (taxi as any).driver?.name,
      (taxi as any).driver?.fullName,

      (taxi as any).vehicle?.number,
      (taxi as any).vehicle?.registrationNumber,
      (taxi as any).vehicle?.type,
      (taxi as any).vehicle?.model,

      (taxi as any).location?.address,
      (taxi as any).location?.area,
      (taxi as any).location?.city,
      (taxi as any).location?.state,
      (taxi as any).location?.name,
    ];

    return possibleValues.filter(Boolean).join(' ').toLowerCase();
  };

  const filteredTaxis = useMemo(() => {
    const query = throttledTaxiSearch.trim().toLowerCase();

    return mockTaxis.filter((taxi) => {
      if (!query) return true;
      return getTaxiSearchText(taxi).includes(query);
    });
  }, [throttledTaxiSearch]);

  const filteredHotels = useMemo(() => {
    const query = throttledHotelSearch.trim().toLowerCase();

    return mockHotels.filter((hotel) => {
      if (!query) return true;

      return (
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query) ||
        hotel.roomType.toLowerCase().includes(query)
      );
    });
  }, [throttledHotelSearch]);

  const filteredAlcoholProducts = useMemo(() => {
    const query = alcoholSearch.trim().toLowerCase();

    return mockAlcoholProducts.filter((item) => {
      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.supplier.name.toLowerCase().includes(query)
      );
    });
  }, [alcoholSearch]);

  const handleAddUser = () => {
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (values: UserFormValues) => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editUser.id
            ? {
                ...user,
                name: values.name,
                email: values.email,
                role: values.role,
                status: values.status,
                details: {
                  ...user.details,
                  security: values.security,
                },
              }
            : user
        )
      );
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      details: {
        activityLogs: [],
        groups: [],
        departments: [],
        security: values.security,
      },
    };

    setUsers((prev) => [newUser, ...prev]);
  };

  return (
    <div className="dashboard-shell">
      <header className="page-header">
        <h1>Operations Dashboard</h1>
        <p>
          Manage users, browse taxis, review hotels, and order alcohol online
          from one dashboard.
        </p>
      </header>

      <div className="top-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'taxis' ? 'active' : ''}`}
          onClick={() => setActiveTab('taxis')}
        >
          Taxis
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'alcohol' ? 'active' : ''}`}
          onClick={() => setActiveTab('alcohol')}
        >
          Order Alcohol
        </button>
      </div>

      {activeTab === 'users' && (
        <>
          <UserToolbar
            searchTerm={searchTerm}
            selectedRole={selectedRole}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchTerm}
            onRoleChange={setSelectedRole}
            onStatusChange={setSelectedStatus}
            onAddUser={handleAddUser}
            appliedSearchTerm={throttledSearchTerm}
          />

          <UserAnalytics users={filteredUsers} totalUsers={users.length} />

          <UserTable users={filteredUsers} onEdit={handleEditUser} />

          <UserFormModal
            isOpen={isModalOpen}
            editUser={editUser}
            onClose={() => {
              setIsModalOpen(false);
              setEditUser(null);
            }}
            onSave={handleSaveUser}
          />
        </>
      )}

      {activeTab === 'taxis' && <TaxiSection />}


      {activeTab === 'hotels' && (
        <section className="tab-panel">
          <div className="section-toolbar">
            <input
              type="text"
              className="input"
              placeholder="Search hotel by name, room type, or location"
              value={hotelSearch}
              onChange={(e) => setHotelSearch(e.target.value)}
            />
          </div>

          <div className="listing-grid">
            {filteredHotels.map((hotel) => (
              <article key={hotel.id} className="listing-card">
                <div className="listing-card-header">
                  <h3>{hotel.name}</h3>
                  <span className="rating-chip">{hotel.rating}★</span>
                </div>

                <p className="listing-subtitle">
                  {hotel.location} • {hotel.roomType}
                </p>

                <div className="info-stack">
                  <div className="info-row">
                    <span>Price / night</span>
                    <strong>₹{hotel.pricePerNight}</strong>
                  </div>
                  <div className="info-row">
                    <span>Guests</span>
                    <strong>Up to {hotel.maxGuests}</strong>
                  </div>
                  <div className="info-row">
                    <span>Amenities</span>
                    <strong>{hotel.amenities.join(', ')}</strong>
                  </div>
                  <div className="info-row">
                    <span>Availability</span>
                    <strong>{hotel.availability}</strong>
                  </div>
                </div>

                <button type="button" className="primary-btn card-btn">
                  Rent This Stay
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'alcohol' && (
        <section className="alcohol-section">
        <div className="alcohol-hero">
          <div>
            <span className="section-kicker">Online delivery</span>
            <h2>Order alcohol online</h2>
            <p>
              Browse curated drinks, check live availability, and contact verified
              suppliers directly from the dashboard.
            </p>
          </div>

          <div className="alcohol-search-card">
            <input
              type="text"
              className="input"
              placeholder="Search by drink, category, or supplier"
              value={alcoholSearch}
              onChange={(e) => setAlcoholSearch(e.target.value)}
            />
            <span className="search-hint">
              Fast search across alcohol name, category, and supplier.
            </span>
          </div>
        </div>

        <div className="alcohol-grid">
          {filteredAlcoholProducts.map((item) => (
            <article key={item.id} className="alcohol-card">
              <div className="alcohol-card-glow" />

              <div className="alcohol-card-header">
                <div>
                  <span className="alcohol-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="alcohol-subtitle">
                    {item.size} • Delivered in {item.deliveryTime}
                  </p>
                </div>

                <span
                  className={`availability-badge ${
                    item.inStock ? 'availability-in' : 'availability-out'
                  }`}
                >
                  {item.inStock ? 'Available now' : 'Out of stock'}
                </span>
              </div>

              <div className="alcohol-price-row">
                <div>
                  <span className="price-label">Starting price</span>
                  <strong className="price-value">₹{item.price}</strong>
                </div>

                <div className="rating-pill">
                  <span>★</span>
                  <strong>{item.rating}</strong>
                </div>
              </div>

              <div className="alcohol-meta-chips">
                <span className="detail-chip">Fast delivery</span>
                <span className="detail-chip">Verified supplier</span>
                <span className="detail-chip">{item.size}</span>
              </div>

              <div className="supplier-card premium-supplier-card">
                <img
                  src={item.supplier.photo}
                  alt={item.supplier.name}
                  className="supplier-photo"
                />

                <div className="supplier-content">
                  <div className="supplier-topline">
                    <span className="supplier-label">Supplier</span>
                    <h4>{item.supplier.name}</h4>
                  </div>

                  <p>{item.supplier.address}</p>

                  <div className="supplier-contact-grid">
                    <a href={`tel:${item.supplier.phone}`} className="supplier-link">
                      📞 {item.supplier.phone}
                    </a>
                    <a href={`mailto:${item.supplier.email}`} className="supplier-link">
                      ✉ {item.supplier.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="alcohol-card-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => window.open(`tel:${item.supplier.phone}`, '_self')}
                >
                  Call Supplier
                </button>

                <button
                  type="button"
                  className="primary-btn alcohol-order-btn"
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'Order Now' : 'Unavailable'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
