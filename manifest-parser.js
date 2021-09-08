var path = require('path')
var fs = require('fs')

const defaultInterfaces = `export interface IStyles {
  fontFamily?: string
  fontSize?: number
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
  textAlignment?: string
  color?: string
}

export interface IFonts {
  body: string
  heading: string
}

export interface IAvatar {
  uri: string
  cache: string
}
`


function parseProp(prop) {
  const ret = []
  if (prop.type === 'boolean') {
    ret.push(`  ${prop.name}?: boolean`)
  } else if (prop.type === 'text' || prop.type === 'color' || prop.type === 'icon') {
      ret.push(`  ${prop.name}?: string`)
    } else if (prop.type === 'image') {
      ret.push(`  ${prop.name}?: string | IAvatar`)
    } else if (prop.type === 'date') {
      ret.push(`  ${prop.name}?: string`)
    } else if (prop.type === 'number') {
      ret.push(`  ${prop.name}?: number`)
    } else if (prop.type === 'list') {
      ret.push(`  ${prop.name}?: I${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}[]`)
    } else if (prop.type === 'action') {
      const builder = []
      builder.push(`${prop.name}?: (`)
      if (prop.arguments) {
        prop.arguments.map(arg => {
          builder.push(`${arg.displayName.split(' ').join('')}?: `)
          if (arg.type === 'text') {
            builder.push('string')
            builder.push(', ')
          } else if (arg.type === 'number') {
            builder.push('number')
            builder.push(', ')
          }
        })
        builder.pop() // remove last comma
      }
      builder.push(`) => void`)
      ret.push(`  ${builder.join('')}`)
    }
    if (prop.styles) {
      ret.push(`  styles: { ${prop.name}: IStyles }`)
    }
    return ret.join('\n')
}

function recursiveSearch(folder, filename, files, output) {
  files = files || fs.readdirSync(folder)
  output = output || []

  files.forEach(file => {
    const newPath = path.join(folder, file)
    if (fs.statSync(newPath).isDirectory()) {
      output = recursiveSearch(newPath, filename, fs.readdirSync(newPath), output)
    } else {
      if (file === filename) {
        output.push(newPath)
      }
    }
  })
  return output
}

const manifests = recursiveSearch('./src', 'manifest.json')

manifests.forEach(manifestFilename => {
  const fileOutputter = []
  fileOutputter.push(`/*********** Manifest Props *******************`)
  fileOutputter.push(` * This file is auto generated, making manual *`)
  fileOutputter.push(` * edits to this file might result in loosing *`)
  fileOutputter.push(` * information.                               *`)
  fileOutputter.push(` **********************************************/`)
  const referencedInterfaces = {}
  fileOutputter.push(`${defaultInterfaces}`)
  const mainInterface = []
  const interface = []
  const jsonstring = fs.readFileSync(manifestFilename)
  const manifest = JSON.parse(jsonstring)

  mainInterface.push(`export interface ${manifest.displayName.split(' ').join('')}Props {`)
  if (manifest.childComponents) {
    manifest.childComponents.map(childComponent => {
      
      const childComponentInterfaceName = `I${childComponent.name.charAt(0).toUpperCase() + childComponent.name.slice(1)}`
      if (childComponent.reference) {
        if (!referencedInterfaces[childComponent.reference]) {
          referencedInterfaces[childComponent.reference] = []
        }
        referencedInterfaces[childComponent.reference].push(`  ${childComponent.name}?: ${childComponentInterfaceName}`)
        interface.push(`export interface ${childComponentInterfaceName} {`)
        childComponent.props.forEach(prop => {
          if (prop.styles) {
            mainInterface.push(`  ${childComponent.name}?: { "${prop.name}": IStyles }`)
          }
          interface.push(parseProp(prop))
        })
        interface.push(`}`)
        interface.push(``)
      } else {
        interface.push(`export interface ${childComponentInterfaceName} {`)
        childComponent.props.forEach(prop => interface.push(parseProp(prop)))
        interface.push(`}`)
        interface.push(``)
        mainInterface.push(`  ${childComponent.name}?: ${childComponentInterfaceName}`)
      }
    })
  }
  manifest.props.forEach(prop => mainInterface.push(parseProp(prop)))
  mainInterface.push(`  appId: string`)
  mainInterface.push(`  _fonts: IFonts`)
  mainInterface.push(`  _width: number`)
  mainInterface.push(`  _height: number`)
  mainInterface.push(`  editor: boolean`)
  mainInterface.push(`}`)
  fileOutputter.push(interface.join('\n'))

  Object.keys(referencedInterfaces).map(ri => {
    fileOutputter.push(`export interface I${ri.charAt(0).toUpperCase() + ri.slice(1)} {`)
    fileOutputter.push(`  id: number`)
    fileOutputter.push(referencedInterfaces[ri].join('\n'))
    fileOutputter.push(`  _meta: any`)
    fileOutputter.push(`}\n`)
  })

  fileOutputter.push(mainInterface.join('\n'))
  const generatedFileName = manifestFilename.replace('manifest.json', 'generated.ts')
  if (fs.existsSync(generatedFileName)) {
    fs.unlinkSync(generatedFileName)
  }
  fs.writeFileSync(generatedFileName, fileOutputter.join('\n'))
  console.log(`Generated file for ${manifestFilename}`)
})
