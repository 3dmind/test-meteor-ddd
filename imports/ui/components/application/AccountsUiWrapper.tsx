import { Blaze } from 'meteor/blaze'
import { Template } from 'meteor/templating'
import * as React from 'react'

export class AccountsUiWrapper extends React.Component {
  componentDidMount(): void {
    this.view = Blaze.render(Template.loginButtons, this.containerRef.current)
  }

  shouldComponentUpdate(): boolean {
    return false
  }

  componentWillUnmount(): void {
    Blaze.remove(this.view)
  }

  private containerRef = React.createRef<HTMLDivElement>()

  private view: Blaze.View

  render(): React.ReactNode {
    return <div ref={this.containerRef} />
  }
}
