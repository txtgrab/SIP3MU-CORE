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

// Import Halaman Verifikator (Fakultas & Universitas)
import VerifikasiFakultas from "../pages/verifikator/VerifikasiFakultas.vue";
import VerifikasiUniversitas from "../pages/verifikator/VerifikasiUniversitas.vue";

// Import Halaman Pimpinan
import PersetujuanPimpinan from "../pages/pimpinan/PersetujuanPimpinan.vue";

// Import Halaman Administrator
import ManajemenPengguna from "../pages/administrator/ManajemenPengguna.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      // Routes Dosen
      { path: "", name: "DosenDashboard", component: DosenDashboard },
      { path: "/Portofolio", name: "Portofolio", component: Portofolio },
      { path: "/penelitian", name: "Penelitian", component: Penelitian },
      { path: "/pengabdian", name: "Pengabdian", component: Pengabdian },
      { path: "/publikasi", name: "Publikasi", component: Publikasi },
      {
        path: "/pendanaan-lain",
        name: "PendanaanLain",
        component: PendanaanLain,
      },
      {
        path: "/kekayaan-intelektual",
        name: "KekayaanIntelektual",
        component: KekayaanIntelektual,
      },

      // Routes Reviewer
      {
        path: "/evaluasi-proposal",
        name: "EvaluasiProposal",
        component: EvaluasiProposal,
      },
      { path: "/monev", name: "ProsesMonev", component: ProsesMonev },

      // Routes Operator
      {
        path: "/verifikasi-usulan",
        name: "VerifikasiUsulan",
        component: VerifikasiUsulan,
      },
      {
        path: "/plotting-reviewer",
        name: "PlottingReviewer",
        component: PlottingReviewer,
      },
      {
        path: "/rekapitulasi-operator",
        name: "RekapitulasiOperator",
        component: RekapitulasiOperator,
      },

      // Routes Verifikator
      {
        path: "/verifikasi-fakultas",
        name: "VerifikasiFakultas",
        component: VerifikasiFakultas,
      },
      {
        path: "/verifikasi-universitas",
        name: "VerifikasiUniversitas",
        component: VerifikasiUniversitas,
      },

      // Routes Pimpinan
      {
        path: "/persetujuan-pimpinan",
        name: "PersetujuanPimpinan",
        component: PersetujuanPimpinan,
      },

      // Routes Administrator
      {
        path: "/manajemen-pengguna",
        name: "ManajemenPengguna",
        component: ManajemenPengguna,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
