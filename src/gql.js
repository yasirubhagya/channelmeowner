import gql from "graphql-tag";

const Add_Doctor = gql`
mutation addDoctor(
    $name:String!,
    $slmcNo: String!,
    $isConsultant: Boolean!,
    $fieldOfConsultingId:ID,
    $createdById:ID!
    ) {
    addDoctor(
        name:$name,
       slmcNo: $slmcNo,
       isConsultant: $isConsultant,
       fieldOfConsultingId:$fieldOfConsultingId,
       createdById:$createdById
    ) {
    _id
    name
    slmcNo
    isConsultant
    fieldOfConsulting{
        _id
    }
    createdBy{
        _id
    }
  }
}
`;

const GET_FieldOfConsultant = gql`
{
  consultantType {
    _id
    name
  }
}
`;

const GET_Doctors = gql`
  {
    doctors {
      _id
      name
      slmcNo
      isConsultant
      fieldOfConsulting{
          _id
          name
      }
      createdBy{
          _id
          name
      }
    }
  }
`;

const DELETE_Doctor = gql`
   mutation DELETE_Doctor($_id:ID!){
    deleteDoctor(_id:$_id){
        _id
        name
    }
   }
`;

const UPDATE_Doctor = gql`
mutation UPDATE_Doctor(
    $_id:ID!,
    $name:String!,
    $slmcNo: String!,
    $isConsultant: Boolean!,
    $fieldOfConsultingId:ID
    ){
     updateDoctor(
         _id:$_id,
         name:$name,
         slmcNo:$slmcNo,
         isConsultant:$isConsultant,
         fieldOfConsultingId:$fieldOfConsultingId
     ){
          _id
         name
     }
    }
`;

const ADD_FieldOfConsultant = gql`
mutation ADD_FieldOfConsultant(
    $name:String!,
    $createdById:ID!
    ) {
      addConsultantType(
        name:$name,
       createdById:$createdById
    ) {
    _id
    name
    createdBy{
        _id
        name
    }
  }
}
`;

const UPDATE_FieldOfConsultant = gql`
mutation UPDATE_FieldOfConsultant(
      $_id:ID!, 
      $name:String!
    ) {
      updateConsultantType(
        _id:$_id,  
        name:$name
    ) {
    _id
    name
    createdBy{
        _id
        name
    }
  }
}
`;

const DELETE_FieldOfConsultant = gql`
   mutation DELETE_FieldOfConsultant($_id:ID!){
    deleteConsultantType(_id:$_id){
        _id
        name
    }
   }
`;

const GET_ChannelCenters = gql`
{
  channelCenters{
    _id
    name
  }
}
`;

const GET_ChannelCenter = gql`
{
  channelCenter{
    _id
    regNo
    name
    owner
    address
    phoneNo
    user{
      _id
      name
    }
    doctors{
       _id
      name
    }
  }
}
`;

const ADD_ChannelCenter = gql`
      mutation ADD_ChannelCenter(
        $regNo: String!,
        $email:String!,
        $name: String!,
        $owner: String!,
        $address: String!,
        $phoneNo: String!
        ){
          addChannelCenter(
            regNo:$regNo,
            email:$email,
            name:$name,
            owner:$owner,
            address:$address,
            phoneNo:$phoneNo
          ){
             _id
             user{
               _id
             }
          }
      }
`;

const GET_Channels = gql`
    {
      channel{
      _id
      doctor{
        _id
        name
        fieldOfConsulting{
          _id
          name
        }
      }
      channelCenter{
        _id
        name
      }
      timeFrom
      timeTo
      chitLimit
      doctorFees
      channelFees
      tax
      status
      }
    }
`;

const ADD_Channels = gql`
mutation ADD_Channels(
  $doctorId: ID
  $timeFrom: String
  $timeTo: String
  $chitLimit: Int
  $doctorFees: Float 
  $channelFees: Float
  $tax: Float
){
  addChannel(
    doctorId:$doctorId,
    timeFrom:$timeFrom ,
    timeTo:$timeTo, 
    chitLimit:$chitLimit,
    doctorFees:$doctorFees, 
    channelFees:$channelFees,
    tax:$tax
  ){
        _id

  }

}
`;


const DELETE_Channels = gql`
mutation DELETE_Channels(
  $_id: ID
){
  deleteChannel(
   _id:$_id
  ){
        _id
  }

}
`;

const UPDATE_Channels = gql`
mutation UPDATE_Channels(
  $_id:ID
  $timeFrom: String
  $timeTo: String
  $chitLimit: Int
  $doctorFees: Float 
  $channelFees: Float
  $tax: Float
  $status:String
)
{
  updateChannel(
    _id:$_id,
    timeFrom:$timeFrom ,
    timeTo:$timeTo, 
    chitLimit:$chitLimit,
    doctorFees:$doctorFees, 
    channelFees:$channelFees,
    tax:$tax,
    status:$status
  ){
        _id
  }
}

`;

const ADD_City = gql`
mutation ADD_City(
  $name: String
){
  addCity(
    name:$name
  ){
        _id
        name
  }

}
`;

const UPDATE_City = gql`
mutation UPDATE_City(
  $_id:ID
  $name: String
){
  updateCity(
    _id:$_id
    name:$name
  ){
        _id
        name
  }

}
`;

const DELETE_City = gql`
mutation DELETE_City(
  $_id: ID
){
  deleteCity(
    _id:$_id
  ){
        _id
        name
  }

}
`;

const GET_Cities = gql`
   {
     cities{
       _id
       name
       createdBy{
         _id
         name
       }
     }
   }
`;

const SEARCH_Channels = gql`
query SEARCH_Channels($doctorId: ID!,$consultantTypeId: ID!,$channelCenterId: ID!,$cityId: ID!,$date: String!,) {
  searchChannels(
    doctorId: $doctorId,
    consultantTypeId:$consultantTypeId,
    channelCenterId: $channelCenterId,
    CityId: $cityId,
    date: $date
    ){
      _id
      doctor{
           _id
           name
           fieldOfConsulting{
             _id
             name
           }
      }
      channelCenter{
                 _id
                 name
      }
      timeFrom
      timeTo
      chitLimit
      doctorFees
      channelFees
      tax
      status
      channelChit{
          _id
      }
  }
}
`;

const ADD_DoctorTOChannelCenter = gql`
mutation ADD_DoctorTOChannelCenter(
  $doctorId: ID
){
  addDoctorToChannelCenter(
    doctorId:$doctorId
  ){    
        _id
        doctors{
          _id
          name
        }
  }

}
`;

const REMOVE_DoctorFromannelCenter = gql`
mutation REMOVE_DoctorFromannelCenter(
  $doctorId: ID
){
  removeDoctorFromChannelCenter(
    doctorId:$doctorId
  ){    
        _id
        doctors{
          _id
          name
        }
  }

}
`;

const LOGIN = gql`
{
  logInOwnerUser{
    _id
    googleId
    email
    name
    picture
    userType
  }
}
`;

export {
  GET_FieldOfConsultant,
  Add_Doctor,
  GET_Doctors,
  DELETE_Doctor,
  UPDATE_Doctor,
  ADD_FieldOfConsultant,
  DELETE_FieldOfConsultant,
  UPDATE_FieldOfConsultant,
  GET_ChannelCenters,
  ADD_ChannelCenter,
  GET_Channels,
  SEARCH_Channels,
  ADD_Channels,
  DELETE_Channels,
  UPDATE_Channels,
  ADD_City,
  GET_Cities,
  DELETE_City,
  UPDATE_City,
  ADD_DoctorTOChannelCenter,
  GET_ChannelCenter,
  REMOVE_DoctorFromannelCenter,
  LOGIN
};