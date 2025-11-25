import React from 'react'

export default function test() {
  return (
    <div>test</div>
  )
}

import React from 'react'

function test() {
  return (
    <div>test</div>
  )
}

export default test

import React from 'react'

export default function test() {
  return (
    <div>test</div>
  )
}
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class test extends Component {
  static propTypes = {second: third}

  render() {
    return (
      <div>test</div>
    )
  }
}
constructor(props) {
  super(props)

  this.state = {
     first
  }
}