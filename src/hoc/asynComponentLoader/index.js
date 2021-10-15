import React from 'react'
import Loading from '../../components/Loading'

export default function asyncLoader(asyncImport) {
    return class Comp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                component: null,
                loading: true,
            }
        }

        componentDidMount() {
            asyncImport().then((cmp) => {
                this.setState({ component: cmp.default, loading: false })
            })
        }

        render() {
            const C = this.state.component
            return C && !this.state.loading ? (
                <C {...this.props} />
            ) : (
                <div
                    style={{
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Loading message={'Loading Components ...'} />
                </div>
            )
        }
    }
}
