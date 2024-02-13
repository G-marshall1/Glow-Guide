import fetchLightsData from '../utils/api'

const data = fetchLightsData('solar-cycle')

const DataDisplay = () => {
    return (
        <div>
            <header>
                <h1> Display Data Test </h1>
            </header>
            <section>
                <p>{data}</p>
            </section>
        </div>
    )
}

export default DataDisplay