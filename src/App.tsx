import { Stuff } from './components/Stuff'
import { Button } from './components/ui/button'
import { Widget } from './components/Widget'
function App() {

  return (
    <>
      <div>
        <Widget projectId="f24a0147-d20f-4f93-8dcf-bf62db2c12be" />
        <Stuff />
        <Button>This is a</Button>
        <h1 className="text-7xl">WHAAT</h1>
      </div>
    </>
  )
}

export default App
