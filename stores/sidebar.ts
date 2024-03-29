export const useSidebarStore = defineStore("sidebarStore", {
  state: () => {
    return {
      drawer: false,
      items: [
        {
          text: "รายการจัดซื้อจัดจ้าง",
          url: { name: "ProcurementList" },
          icon: "fa-solid fa-cart-shopping",
          roles: [1, 2, 3],
        },
        {
          text: "ตรวจสอบ/อนุมัติ",
          url: { name: "ApproveList" },
          noti: 0,
          icon: "fa-solid fa-square-check",
          roles: [4],
        },
        {
          text: "รายการส่งกลับแก้ไขจัดซื้อจัดจ้าง",
          url: { name: "ReturnProcurementEditView" },
          noti: 1,
          icon: "fa-solid fa-rotate-left",
          roles: [1, 2, 3],
        },
        {
          text: "กำหนดเส้นทางการอนุมัติ",
          url: { name: "ApproveFlowList" },
          icon: "fa-solid fa-list-tree",
          roles: [2, 3],
        },
        {
          header: "จัดการข้อมูล",
          roles: [1, 2, 3],
        },
        {
          text: "จัดการชื่อร้านค้า/ผู้ขาย/ผู้รับจ้าง",
          url: { name: "ManageSupplierView" },
          icon: "fa-solid fa-store",
          roles: [1, 2, 3],
        },
        {
          header: "ตั้งค่าระบบ",
          roles: [2, 3],
        },
        {
          text: "สิทธิ์การใช้งาน",
          url: { name: "PermissionList" },
          icon: "fa-solid fa-shield-check",
          roles: [2, 3],
        },
      ],
    };
  },
});
