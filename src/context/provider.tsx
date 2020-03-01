import * as React from 'react';
import Context, { IContextProps } from './createContext';

class AppProvider extends React.Component {
  state: IContextProps = {
    lang: 'en',
    changeLang: (lang: string) => this.setState({ lang }),
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export default AppProvider;
