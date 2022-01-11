import { AiFillCaretRight } from "react-icons/ai"
import { SiCashapp } from "react-icons/si"
import { GoFile } from "react-icons/go"
import { IoNotificationsOutline } from "react-icons/io5"
import { RiBankLine } from "react-icons/ri"
import {
     FcApproval,
     FcHighPriority,
     FcSimCardChip,
} from "react-icons/fc"

export const menuList = [
  { key: 1, icon: <AiFillCaretRight />, name: 'หน้าหลัก', path: '/' },
  {
    key: 2,
    icon: (
      <IoNotificationsOutline
        style={{
          fontSize: '20px',
           color: '#3ebfff',

        }}
      />
    ),
    name: 'การแจ้งเตือน',
    path: '/',
  },
  {
    key: 3,
    icon: (
      <RiBankLine
        style={{
          fontSize: '20px',
          color: '#3ebfff',
        }}
      />
    ),
    name: ' สเตสเม้น',
    path: '/',
  },
  {
    key: 4,
    icon: (
      <GoFile
        style={{
          fontSize: '20px',
          color: '#3ebfff',
        }}
      />
    ),
    name: 'แบบฟอร์ม',
    SubMenu: [
      {
        key: 41,
        icon: <FcApproval style={{ fontSize: '20px' }} />,
        name: '1.1 สมัคร',
        path: '/member/register',
      },
      {
        key: 42,
        icon: (
          <SiCashapp
            style={{
              fontSize: '18x',
              color: '#17b85a',
            }}
          />
        ),
        name: '1.2 ฝาก',
        path: '/member/deposit',
      },
      {
        key: 43,
        icon: (
          <SiCashapp
            style={{
              fontSize: '18px',
              color: '#ff3b3b',
            }}
          />
        ),
        name: '1.3 ถอน',
        path: '/member/withdraw',
      },
      {
        key: 44,
        icon: <FcSimCardChip style={{ fontSize: '20px' }} />,
        name: ' 1.4 โปรโมชั่น',
        path: '/member/promotion',
      },
      {
        key: 45,
        icon: <FcHighPriority style={{ fontSize: '20px' }} />,
        name: ' 1.5 ปัญหา',
        path: '/member/issue',
      },
    ],
  },
  {
    key: 5,
    icon: <AiFillCaretRight />,
    name: 'ตั้งค่า',
    SubMenu: [
      {
        key: 51,
        icon: <AiFillCaretRight />,
        name: '3.1 การแจ้งเตือน',
        path: '/',
      },
      {
        key: 52,
        icon: <AiFillCaretRight />,
        name: '3.2 ทีมงาน',
        path: '/setting/admin',
      },
      {
        key: 53,
        icon: <AiFillCaretRight />,
        name: '3.3 ธนาคาร',
        path: '/setting/bank',
      },
      {
        key: 54,
        icon: <AiFillCaretRight />,
        name: '3.4 เกม',
        path: '/setting/game',
      },
      {
        key: 55,
        icon: <AiFillCaretRight />,
        name: '3.5 โปรโมชั่น',
        path: '/setting/promotion',
      },
      {
        key: 56,
        icon: <AiFillCaretRight />,
        name: '3.6 คืนยอดเสีย',
        path: '/setting/payback',
      },
      {
        key: 57,
        icon: <AiFillCaretRight />,
        name: '3.7 พาร์ทเนอร์',
        path: '/setting/partner',
      },
    ],
  },
  {
    key: 6,
    icon: <AiFillCaretRight />,
    name: 'แอดมิน',
    SubMenu: [
      {
        key: 61,
        icon: <AiFillCaretRight />,
        name: 'ข้อมูลแอดมิน',
        path: '/admin/me',
      },
      {
        key: 62,
        icon: <AiFillCaretRight />,
        name: 'เปลี่ยนรหัสผ่าน',
        path: '/admin/change-pass',
      },
      {
        key: 63,
        icon: <AiFillCaretRight />,
        name: 'ออกจากระบบ',
        path: '/logout',
      },
    ],
  },
]
