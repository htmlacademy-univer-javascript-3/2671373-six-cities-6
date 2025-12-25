import {LoginPage} from '@/pages/Login';
import {withRouter, withStore} from '@/shared/utils/hocs.tsx';
import {deleteToken} from '@/shared/services';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {apiRoute} from '@/shared/constants';

describe('page: Login', () => {
  const mockEmail = 'test@mail.ru';
  const mockPassword = 'qwe123';

  beforeAll(() => {
    deleteToken();
  });

  it('should render correctly', () => {
    const { component: routerComponent } = withRouter(<LoginPage/>);
    const { component } = withStore(routerComponent, {
      auth: {
        isLoading: false,
        authorizationStatus: false
      }
    });

    render(component);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('login-form-email')).toBeInTheDocument();
    expect(screen.getByTestId('login-form-password')).toBeInTheDocument();
    expect(screen.getByTestId('login-form-submit')).toBeInTheDocument();
  });

  it('should form submitting work correctly', async () => {
    const { component: routerComponent } = withRouter(<LoginPage/>);
    const { component, mockStore, mockAxiosAdapter } = withStore(routerComponent, {
      auth: {
        isLoading: false,
        authorizationStatus: false
      }
    });

    mockAxiosAdapter.onPost(apiRoute.login).reply(201, {});
    render(component);

    await userEvent.type(screen.getByTestId('login-form-email'), mockEmail);
    await userEvent.type(screen.getByTestId('login-form-password'), mockPassword);
    await userEvent.click(screen.getByTestId('login-form-submit'));

    const getLoginAction = mockStore.getActions()[0];
    const args = ((getLoginAction as unknown as {meta: {arg: {email: string; password: string}}}).meta.arg);

    expect(args.email).toEqual(mockEmail);
    expect(args.password).toEqual(mockPassword);
  });
});
