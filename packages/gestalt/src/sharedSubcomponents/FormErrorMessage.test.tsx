import { create } from 'react-test-renderer';
import FormErrorMessage from './FormErrorMessage';

describe('FormErrorMessage', () => {
  it('with errorMessage', () => {
    const tree = create(<FormErrorMessage id="test" text="some error message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with no errorMessage', () => {
    const tree = create(<FormErrorMessage id="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
