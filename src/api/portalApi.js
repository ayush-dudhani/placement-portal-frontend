import axiosClient from "./axiosClient";

const pageParams = (params = {}) => ({ page: 0, size: 50, ...params });

export const portalApi = {
  me: () => axiosClient.get("/api/v1/me").then((r) => r.data),
  profile: () => axiosClient.get("/api/v1/students/me/profile").then((r) => r.data),
  academics: () => axiosClient.get("/api/v1/students/me/academics").then((r) => r.data),
  skills: () => axiosClient.get("/api/v1/students/me/skills").then((r) => r.data),
  updateProfile: (data) => axiosClient.put("/api/v1/students/me/profile", data).then((r) => r.data),
  updateAcademics: (data) => axiosClient.put("/api/v1/students/me/academics", data).then((r) => r.data),
  updateSkills: (skills) => axiosClient.put("/api/v1/students/me/skills", { skills }).then((r) => r.data),
  companies: (params) => axiosClient.get("/api/v1/companies", { params: pageParams(params) }).then((r) => r.data),
  company: (id) => axiosClient.get(`/api/v1/companies/${id}`).then((r) => r.data),
  drives: (params) => axiosClient.get("/api/v1/drives", { params: pageParams(params) }).then((r) => r.data),
  applications: (params) => axiosClient.get("/api/v1/students/me/applications", { params: pageParams(params) }).then((r) => r.data),
  apply: (driveId, roleId, idempotencyKey) => axiosClient.post(`/api/v1/drives/${driveId}/roles/${roleId}/applications`, {}, { headers: { "Idempotency-Key": idempotencyKey } }).then((r) => r.data),
  studentDashboard: () => axiosClient.get("/api/v1/students/me/dashboard").then((r) => r.data),
  adminDashboard: () => axiosClient.get("/api/v1/admin/dashboard").then((r) => r.data),
  adminAnalytics: () => axiosClient.get("/api/v1/admin/analytics/overview").then((r) => r.data),
};
