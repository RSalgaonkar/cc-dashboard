// import { describe, expect, it, vi, beforeEach } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import UserFormModal from './UserFormModal';
// import { User } from '../../types/user';

// describe('UserFormModal', () => {
//   const onClose = vi.fn();
//   const onSave = vi.fn();

//   const baseProps = {
//     isOpen: true,
//     editUser: null,
//     onClose,
//     onSave,
//   };

//   const editUser: User = {
//     id: '1',
//     name: 'Aarav Mehta',
//     email: 'aarav.mehta@example.com',
//     role: 'Admin',
//     status: 'Active',
//     details: {
//       activityLogs: [],
//       groups: [],
//       departments: [],
//       security: {
//         twoFactorEnabled: true,
//         passwordAgeDays: 12,
//         lastPasswordUpdate: '2026-03-20',
//         loginAlertsEnabled: true,
//       },
//     },
//   };

//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('renders nothing when modal is closed', () => {
//     const { container } = render(
//       <UserFormModal
//         isOpen={false}
//         editUser={null}
//         onClose={onClose}
//         onSave={onSave}
//       />
//     );

//     expect(container.firstChild).toBeNull();
//   });

//   it('updates internal form values when typing and selecting inputs', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const roleSelect = screen.getByLabelText(/^role$/i);
//     const statusSelect = screen.getByLabelText(/account status/i);

//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'Rashmith Salgaonkar');

//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'rashmith@example.com');

//     await userEvent.selectOptions(roleSelect, 'Editor');
//     await userEvent.selectOptions(statusSelect, 'Pending');

//     expect(nameInput).toHaveValue('Rashmith Salgaonkar');
//     expect(emailInput).toHaveValue('rashmith@example.com');
//     expect(roleSelect).toHaveValue('Editor');
//     expect(statusSelect).toHaveValue('Pending');
//   });

//   it('shows required validation errors for empty name and email', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const submitButton = screen.getByRole('button', { name: /create user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.clear(emailInput);
//     await userEvent.click(submitButton);

//     expect(screen.getByText('Name is required')).toBeInTheDocument();
//     expect(screen.getByText('Email is required')).toBeInTheDocument();
//     expect(onSave).not.toHaveBeenCalled();
//     expect(onClose).not.toHaveBeenCalled();
//   });

//   it('shows invalid email error when email format is incorrect', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const submitButton = screen.getByRole('button', { name: /create user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'Neha Sharma');

//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'invalid-email');

//     await userEvent.click(submitButton);

//     expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
//     expect(onSave).not.toHaveBeenCalled();
//     expect(onClose).not.toHaveBeenCalled();
//   });

//   it('submits the form successfully with valid create data', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const roleSelect = screen.getByLabelText(/^role$/i);
//     const statusSelect = screen.getByLabelText(/account status/i);
//     const submitButton = screen.getByRole('button', { name: /create user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'Kunal Verma');

//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'kunal.verma@example.com');

//     await userEvent.selectOptions(roleSelect, 'Viewer');
//     await userEvent.selectOptions(statusSelect, 'Active');

//     await userEvent.click(submitButton);

//     expect(onSave).toHaveBeenCalledTimes(1);
//     expect(onSave).toHaveBeenCalledWith({
//       name: 'Kunal Verma',
//       email: 'kunal.verma@example.com',
//       role: 'Viewer',
//       status: 'Active',
//     });
//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it('prefills fields correctly in edit mode', () => {
//     render(
//       <UserFormModal
//         isOpen={true}
//         editUser={editUser}
//         onClose={onClose}
//         onSave={onSave}
//       />
//     );

//     expect(screen.getByLabelText(/name/i)).toHaveValue('Aarav Mehta');
//     expect(screen.getByLabelText(/email/i)).toHaveValue('aarav.mehta@example.com');
//     expect(screen.getByLabelText(/^role$/i)).toHaveValue('Admin');
//     expect(screen.getByLabelText(/account status/i)).toHaveValue('Active');
//     expect(screen.getByRole('button', { name: /update user/i })).toBeInTheDocument();
//   });

//   it('submits updated values in edit mode', async () => {
//     render(
//       <UserFormModal
//         isOpen={true}
//         editUser={editUser}
//         onClose={onClose}
//         onSave={onSave}
//       />
//     );

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const roleSelect = screen.getByLabelText(/^role$/i);
//     const statusSelect = screen.getByLabelText(/account status/i);
//     const submitButton = screen.getByRole('button', { name: /update user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'Aarav M.');

//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'aarav.m@example.com');

//     await userEvent.selectOptions(roleSelect, 'Editor');
//     await userEvent.selectOptions(statusSelect, 'Inactive');

//     await userEvent.click(submitButton);

//     expect(onSave).toHaveBeenCalledTimes(1);
//     expect(onSave).toHaveBeenCalledWith({
//       name: 'Aarav M.',
//       email: 'aarav.m@example.com',
//       role: 'Editor',
//       status: 'Inactive',
//     });
//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it('clears field errors after user corrects invalid inputs', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const submitButton = screen.getByRole('button', { name: /create user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.clear(emailInput);
//     await userEvent.click(submitButton);

//     expect(screen.getByText('Name is required')).toBeInTheDocument();
//     expect(screen.getByText('Email is required')).toBeInTheDocument();

//     await userEvent.type(nameInput, 'Priya Nair');
//     await userEvent.type(emailInput, 'priya.nair@example.com');

//     expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
//     expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
//   });

//   it('does not submit when email remains invalid even if other fields are valid', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const roleSelect = screen.getByLabelText(/^role$/i);
//     const statusSelect = screen.getByLabelText(/account status/i);
//     const submitButton = screen.getByRole('button', { name: /create user/i });

//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'Valid User');

//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'wrong-email-format');

//     await userEvent.selectOptions(roleSelect, 'Admin');
//     await userEvent.selectOptions(statusSelect, 'Pending');

//     await userEvent.click(submitButton);

//     expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
//     expect(onSave).not.toHaveBeenCalled();
//     expect(onClose).not.toHaveBeenCalled();
//   });

//   it('calls onClose when cancel is clicked', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const cancelButton = screen.getByRole('button', { name: /cancel/i });
//     await userEvent.click(cancelButton);

//     expect(onClose).toHaveBeenCalledTimes(1);
//     expect(onSave).not.toHaveBeenCalled();
//   });

//   it('calls onClose when close icon button is clicked', async () => {
//     render(<UserFormModal {...baseProps} />);

//     const closeButton = screen.getByRole('button', { name: /close modal/i });
//     await userEvent.click(closeButton);

//     expect(onClose).toHaveBeenCalledTimes(1);
//     expect(onSave).not.toHaveBeenCalled();
//   });
// });

export {}