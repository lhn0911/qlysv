// Index.tsx
import React, { useState } from 'react';
import Addsv from './Addsv';

interface Student {
  id: number;
  code: string;
  name: string;
  dateOfBirth: string;
  email: string;
  status: string;
}

const getInitialStudents = (): Student[] => {
  const storedStudents = localStorage.getItem('students');
  if (storedStudents) {
    return JSON.parse(storedStudents);
  } else {
    return [
      {
        id: 1,
        code: 'SV001',
        name: 'Nguyễn Văn A',
        dateOfBirth: '2023-12-21',
        email: 'nva@gmail.com',
        status: 'Đang hoạt động',
      },
      {
        id: 2,
        code: 'SV002',
        name: 'Nguyễn Thị B',
        dateOfBirth: '2021-11-21',
        email: 'ntb@gmail.com',
        status: 'Ngừng hoạt động',
      },
    ];
  }
};

const Index: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(getInitialStudents());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState<number | null>(null);

  const updateLocalStorage = (updatedStudents: Student[]) => {
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const handleToggleBlock = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn thực hiện hành động này không?')) {
      const updatedStudents = students.map((student) =>
        student.id === id
          ? { ...student, status: student.status === 'Đang hoạt động' ? 'Ngừng hoạt động' : 'Đang hoạt động' }
          : student
      );
      updateLocalStorage(updatedStudents);
    }
  };

  const handleEdit = (id: number) => {
    setEditMode(id);
  };

  const handleSave = (id: number) => {
    setEditMode(null);
    // Logic to save edited data
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      const updatedStudents = students.filter((student) => student.id !== id);
      updateLocalStorage(updatedStudents);
    }
  };

  return (
    <div>
     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Quản lý sinh viên</h2>
        <button
          style={{
            backgroundColor: 'rgba(26, 89, 249, 0.714)',
            color: 'white',
            width: 'auto',
            height: '30px',
            position: 'relative',
            bottom: '-30px',
          }}
          onClick={() => setShowAddForm(true)}
        >
          Thêm mới sinh viên
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <select name="" id="">
          <option value="">Sắp xếp theo tuổi</option>
          <option value="">Sắp xếp theo tên</option>
          <option value="">Sắp xếp theo mã sv</option>
        </select>
        <input type="text" placeholder="Tìm kiếm từ khóa theo tên hoặc email" />
      </div>
      <div>
        <table style={{ width: '60%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.code}</td>
                <td>
                  {editMode === student.id ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].name = e.target.value;
                        setStudents(updatedStudents);
                      }}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>{student.dateOfBirth}</td>
                <td>{student.email}</td>
                <td
                  style={{
                    backgroundColor: student.status === 'Đang hoạt động' ? 'rgb(214, 238, 188)' : 'rgb(255, 179, 179)',
                    borderRadius: '5px',
                    color: student.status === 'Đang hoạt động' ? 'green' : 'red',
                  }}
                >
                  {student.status}
                </td>
                <td>
                  {editMode === student.id ? (
                    <button
                      style={{
                        backgroundColor: 'rgb(155, 48, 255)',
                        borderRadius: '5px',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSave(student.id)}
                    >
                      Lưu
                    </button>
                  ) : (
                    <>
                      <button
                        style={{
                          backgroundColor: 'rgb(239, 212, 251)',
                          borderRadius: '5px',
                          color: 'purple',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleToggleBlock(student.id)}
                      >
                        {student.status === 'Đang hoạt động' ? 'Chặn' : 'Bỏ chặn'}
                      </button>
                      <button
                        style={{
                          backgroundColor: 'rgb(255, 221, 201)',
                          borderRadius: '5px',
                          color: 'orangered',
                          marginLeft: '10px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleEdit(student.id)}
                      >
                        Sửa
                      </button>
                    </>
                  )}
                  <button
                    style={{
                      backgroundColor: 'rgb(255, 179, 179)',
                      borderRadius: '5px',
                      color: 'red',
                      marginLeft: '10px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(student.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <span className="pagination">1</span>
        <span className="pagination">2</span>
        <span className="pagination">3</span>
        <span className="pagination">4</span>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Addsv students={students} setStudents={updateLocalStorage} closeModal={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
