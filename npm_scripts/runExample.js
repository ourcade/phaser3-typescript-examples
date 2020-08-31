const { Command } = require('commander')
const ParcelBundler = require('parcel-bundler')

const program = new Command()

program
  .option('-e, --example <example>', 'path to example', 'actions/grid-action')

program.parse(process.argv)

const examplePath = program.example

const parcel = new ParcelBundler(`src/${examplePath}/index.html`)

const runExample = async () => {
	await parcel.serve(8000)
}

runExample()
