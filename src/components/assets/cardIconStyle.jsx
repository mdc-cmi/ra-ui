import styles from "./cardHeaderBase.jsx"

export default theme => ({
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
      borderRadius: "3px",
      backgroundColor: theme.palette.grey[500],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  warningCardHeader: styles(theme).warningCardHeader,
  successCardHeader: styles(theme).successCardHeader,
  dangerCardHeader: styles(theme).dangerCardHeader,
  infoCardHeader: styles(theme).infoCardHeader,
  primaryCardHeader: styles(theme).primaryCardHeader
})
