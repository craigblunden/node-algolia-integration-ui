import React from 'react'

export default (props) => {
  return (
      <form onSubmit={(e) => props.onSubmit(e)} data-testid="form">
        <label htmlFor="netoWebsiteURL">netoWebsiteURL
          <input type="text" id="netoWebsiteURL" name="netoWebsiteURL" onChange={(e) => props.handleChange(e)} value={props.netoWebsiteURL}/>
        </label>
        <br />
        <label htmlFor="netoAPIUsername">netoAPIUsername
          <input type="text" id="netoAPIUsername" name="netoAPIUsername" onChange={(e) => props.handleChange(e)} value={props.netoAPIUsername}/>
        </label>
        <br />
        <label htmlFor="netoAPIKey">netoAPIKey
          <input type="text" id="netoAPIKey" name="netoAPIKey" onChange={(e) => props.handleChange(e)} value={props.netoAPIKey}/>
        </label>
        <br />
        <label htmlFor="algoliaAppID">algoliaAppID</label>
          <input type="text" id="algoliaAppID" name="algoliaAppID" onChange={(e) => props.handleChange(e)} value={props.algoliaAppID}/>
        <br />
        <label htmlFor="algoliaAPIKey">algoliaAPIKey
          <input type="text" id="algoliaAPIKey" name="algoliaAPIKey" onChange={(e) => props.handleChange(e)} value={props.algoliaAPIKey}/>
        </label>
        <br />
        <label htmlFor="algoliaIndex">algoliaIndex
          <input type="text" id="algoliaIndex" name="algoliaIndex" onChange={(e) => props.handleChange(e)} value={props.algoliaIndex}/>
        </label>
        <br />
        <input type="submit" value="Submit" data-testid="form-submit" />
      </form>
  )
}
