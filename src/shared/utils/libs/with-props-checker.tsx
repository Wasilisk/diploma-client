import { Component, ComponentType } from 'react'

const withPropsChecker = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return class PropsChecker extends Component<P> {
        componentDidUpdate(prevProps: P) {
            const nextProps = this.props
            Object.keys(nextProps).forEach((key) => {
                if (nextProps[key as keyof P] !== prevProps[key as keyof P]) {
                    console.log(
                        'changed property:',
                        key,
                        'from',
                        prevProps[key as keyof P],
                        'to',
                        nextProps[key as keyof P],
                    )
                }
            })
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withPropsChecker