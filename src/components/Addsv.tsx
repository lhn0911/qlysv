import React, { useState } from 'react';

interface Student {
  id: number;
  code: string;
  name: string;
  dateOfBirth: string;
  email: string;
  status: string;
}

interface AddsvProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  closeModal: () => void;
}

const Addsv: React.FC<AddsvProps> = ({ students, setStudents, closeModal }) => {
  const [newStudent, setNewStudent] = useState<Student>({
    id: students.length + 1,
    code: '',
    name: '',
    dateOfBirth: '',
    email: '',
    status: 'Đang hoạt động',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStudents = [...students, { ...newStudent, id: students.length + 1 }];
    setStudents(updatedStudents);
    closeModal();  // Close the modal after submitting the form
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <input type="text" name="code" placeholder="Mã sinh viên" value={newStudent.code} onChange={handleChange} required style={{ width: '100%' }} />
        <input type="text" name="name" placeholder="Tên sinh viên" value={newStudent.name} onChange={handleChange} required style={{ width: '100%' }} />
        <input type="date" name="dateOfBirth" placeholder="Ngày sinh" value={newStudent.dateOfBirth} onChange={handleChange} required style={{ width: '100%' }} />
        <input type="email" name="email" placeholder="Email" value={newStudent.email} onChange={handleChange} required style={{ width: '100%' }} />
        <button type="submit" style={{ backgroundColor: 'rgba(26, 89, 249, 0.714)', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Thêm sinh viên</button>
        <button type="button" onClick={closeModal} style={{ marginTop: '10px', backgroundColor: 'grey', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Hủy</button>
      </form>
    </div>
  );
};

export default Addsv;
