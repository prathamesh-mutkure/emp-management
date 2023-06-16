interface Department {
  creation_date: string;
  department_head: string;
  department_id: number;
  department_name: string;
  description: string;
  last_update_date: string;
}

interface Employee {
  firstname: string;
  lastname: string;
  username: string;
  emailid: string;
  password: string;
  mobileno: number;
  department: Department;
  roles: string[];
  type: string;
  city: string;
  street: string;
  pincode: string;
  question: string;
  answer: string;
  createdDate: string;
  lastUpdateDdate: string;
}

interface EmployeeDepartment {
  username: string;
  departments: Department[];
}

interface Role {
  id: number;
  name: string;
}

interface View {
  contentType: string;
}
