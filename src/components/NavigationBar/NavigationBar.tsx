import * as Styled from './NavigationBar.style';

export default function NavigationBar({ children }: React.PropsWithChildren) {
  return <Styled.NavigationBar>{children}</Styled.NavigationBar>;
}
