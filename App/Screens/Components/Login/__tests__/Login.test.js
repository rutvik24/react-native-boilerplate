import React from 'react';
import {render} from '@testing-library/react-native';
import Login from '../Login';
import {AppContextProvider} from '../../../../AppContext/index';

jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
        if (this.props[interfaceLanguage]) {
          var localizedStrings = this.props[this.language];
          for (var key in localizedStrings) {
            if (localizedStrings.hasOwnProperty(key)) {
              this[key] = localizedStrings[key];
            }
          }
        }
      }
    },
);

jest.mock('react-native-localize', () => {
  return {
    getLocales: jest.fn(),
    // you can add other functions mock here that you are using
  };
});

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('Login', () => {
  it('Login render', () => {
    const {getByPlaceholderText} = render(<Login />, {
      wrapper: AppContextProvider,
    });

    const email = getByPlaceholderText('Email');
    expect(email).toBeTruthy();
  });

  it('Password render', () => {
    const {getByPlaceholderText} = render(<Login />, {
      wrapper: AppContextProvider,
    });

    const email = getByPlaceholderText('Password');
    expect(email).toBeTruthy();
  });

  it('Button render', () => {
    const {getByTestId} = render(<Login />, {
      wrapper: AppContextProvider,
    });

    const email = getByTestId('Log in');
    expect(email).toBeTruthy();
  });
});
