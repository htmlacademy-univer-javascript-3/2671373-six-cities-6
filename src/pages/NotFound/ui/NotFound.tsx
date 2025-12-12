import {Link} from 'react-router-dom';

const NotFoundPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
    <h1>404 Not Found</h1>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
