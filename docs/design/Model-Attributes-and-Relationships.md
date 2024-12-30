>--< Many to Many
>--- Many to One

# Asset and Relationships
- Asset Groups (Name, Description) --< Assets
- Asset Category (Name) --< Asset Type (Name) ---< Assets
- Asset >--< Practice Areas (Name)


# User / Contributor and Organization
User attributes are be the same as People Depot.  Organization will use the same attributes as People Depot, once those are defined.  
- User >--< Org (Name)

# Asset Groups and Related Tables
Asset Groups have the following fields in addition to the M-M data
- Description - Display
- Internal Source - Display if value provided
- External Source - Display if value provided
- Asset Group -< Assets
- Asset Group >--< Topic Areas (Name)
- Asset Group >--< Tools (Name)
- Asset Group >- (Primary) Tool
- Asset Group >- (Primary) Asset



# Assets and Related Tables
- Asset >-- Asset Group
- Asset >--< Usability
- Active (T/F) - Internal
- Published (T/F) - InternalThe following tabes have an M-M relationship with assets:
- Google ID - Internal
- Title - Display
- Description - Display
- Slug - Internal
- Published (T/F)? - Internal
- Asset >--< Contributor(s)/User(s)
- Asset >-- Phase (Name)

People Depot tables
Users
Tools
Practice Areas

