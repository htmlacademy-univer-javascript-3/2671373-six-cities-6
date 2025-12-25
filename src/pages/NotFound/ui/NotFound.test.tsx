import {NotFoundPage} from '@/pages/NotFound';
import {withRouter} from '@/shared/utils/hocs.tsx';
import {render, screen} from '@testing-library/react';

describe('page: NotFound', () => {
  it('should render correctly', () => {
    render(withRouter(<NotFoundPage />).component);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
