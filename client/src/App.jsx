import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Case Study Pages */
import CaseList from "./pages/admin/caseStudies/list";
import CaseNew from "./pages/admin/caseStudies/new";
import CaseUpdate from "./pages/admin/caseStudies/update";
import CaseDelete from "./pages/admin/caseStudies/delete";

/* Illustration Pages */
import IllustrationList from "./pages/admin/illustrations/list";
import IllustrationNew from "./pages/admin/illustrations/new";
import IllustrationUpdate from "./pages/admin/illustrations/update";
import IllustrationDelete from "./pages/admin/illustrations/delete";

/* user pages */

import HomePage from "./pages/user/home";
import AboutPage from "./pages/user/about";

/*front end case study pages*/
import JimPage from "./pages/user/cases/jim";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/admin/case/list" element={<CaseList />} />
        <Route path="/admin/case/new" element={<CaseNew />} />
        <Route path="/admin/case/update/:id" element={<CaseUpdate />} />
        <Route path="/admin/case/delete/:id" element={<CaseDelete />} />

    
        <Route path="/admin/illustration/list" element={<IllustrationList />} />
        <Route path="/admin/illustration/new" element={<IllustrationNew />} />
        <Route path="/admin/illustration/update/:id" element={<IllustrationUpdate />} />
        <Route path="/admin/illustration/delete/:id" element={<IllustrationDelete />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/jim" element={<JimPage />} />
      </Routes>
    </Router>
  );
}

export default App;
