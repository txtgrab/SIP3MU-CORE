import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import DashboardLayout from "../components/DashboardLayout.vue";

// Import Halaman Dosen
import DosenDashboard from "../pages/dosen/Dashboard.vue";
import Portofolio from "../pages/dosen/Portofolio.vue";
import Penelitian from "../pages/dosen/Penelitian.vue";
import Pengabdian from "../pages/dosen/Pengabdian.vue";
import Publikasi from "../pages/dosen/Publikasi.vue";
import PendanaanLain from "../pages/dosen/PendanaanLain.vue";
import KekayaanIntelektual from "../pages/dosen/KekayaanIntelektual.vue";

// Import Halaman Reviewer
import EvaluasiProposal from "../pages/reviewer/EvaluasiProposal.vue";
import ProsesMonev from "../pages/reviewer/ProsesMonev.vue";

// Import Halaman Operator
import VerifikasiUsulan from "../pages/operator/VerifikasiUsulan.vue";
import PlottingReviewer from "../pages/operator/PlottingReviewer.vue";
import RekapitulasiOperator from "../pages/operator/RekapitulasiOperator.vue";

// Import Halaman Verifikator
import VerifikasiFakultas from "../pages/verifikator/VerifikasiFakultas.vue";
import VerifikasiUniversitas from "../pages/verifikator/VerifikasiUniversitas.vue";

// Import Halaman Pimpinan
import PersetujuanPimpinan from "../pages/pimpinan/PersetujuanPimpinan.vue";

// Import Halaman Administrator
import ManajemenPengguna from "../pages/administrator/ManajemenPengguna.vue";

const routes = [
  {
    // Arahkan root URL langsung ke /login
    path: "/",
    redirect: "/login" 
  },
  {
    // Rute Login yang sebenarnya
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false } 
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true }, 
    children: [
      { path: "", name: "DosenDashboard", component: DosenDashboard },
      { path: "portofolio", name: "Portofolio", component: Portofolio },
      { path: "penelitian", name: "Penelitian", component: Penelitian },
      { path: "pengabdian", name: "Pengabdian", component: Pengabdian },
      { path: "publikasi", name: "Publikasi", component: Publikasi },
      { path: "pendanaan-lain", name: "PendanaanLain", component: PendanaanLain },
      { path: "kekayaan-intelektual", name: "KekayaanIntelektual", component: KekayaanIntelektual },
      { path: "evaluasi-proposal", name: "EvaluasiProposal", component: EvaluasiProposal },
      { path: "monev", name: "ProsesMonev", component: ProsesMonev },
      { path: "verifikasi-usulan", name: "VerifikasiUsulan", component: VerifikasiUsulan },
      { path: "plotting-reviewer", name: "PlottingReviewer", component: PlottingReviewer },
      { path: "rekapitulasi-operator", name: "RekapitulasiOperator", component: RekapitulasiOperator },
      { path: "verifikasi-fakultas", name: "VerifikasiFakultas", component: VerifikasiFakultas },
      { path: "verifikasi-universitas", name: "VerifikasiUniversitas", component: VerifikasiUniversitas },
      { path: "persetujuan-pimpinan", name: "PersetujuanPimpinan", component: PersetujuanPimpinan },
      { path: "manajemen-pengguna", name: "ManajemenPengguna", component: ManajemenPengguna },
    ],
  },
  {
    // KUNCI ANTI LAYAR PUTIH: Catch-all route (404)
    // Jika user mengetik URL ngawur, kembalikan ke Login
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// PENJAGA PINTU (Navigation Guard)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("sip3mu_token");
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Belum login tapi maksa masuk -> tendang ke /login
    next("/login");
  } 
  else if (to.path === "/login" && isAuthenticated) {
    // Sudah login tapi coba buka /login -> arahkan ke /dashboard
    next("/dashboard");
  } 
  else {
    next();
  }
});

export default router;