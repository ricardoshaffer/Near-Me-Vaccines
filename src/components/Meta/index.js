import React from 'react';
import { Helmet } from 'react-helmet';

function MetaTags(props) {
  return (
<head>
<Helmet>

<meta name="description" content={props.metadescription} />
<meta name="title" content={props.metatitle} />
<link rel="canonical" href={props.canonicalURL}/>

<title>{props.title}</title>

</Helmet>
</head>
);
}
export default MetaTags;
