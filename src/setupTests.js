import 'raf/polyfill';
import 'babel-polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/** configure enyme for unit testing */
configure({ adapter: new Adapter() });
