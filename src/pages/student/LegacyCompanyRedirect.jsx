import { Navigate, useParams } from "react-router-dom";

export default function LegacyCompanyRedirect() {
  const { slug } = useParams();
  return <Navigate replace to={`/student/company?companyid=${slug}`} />;
}
