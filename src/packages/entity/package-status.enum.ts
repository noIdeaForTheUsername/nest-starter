// Note: do not change the order of these enums. PackagesService.changePackageStatus() relies
// on the numbers during checks
export enum PackageStatus {
  // standard cycle
  CREATED = 1,
  PAID,
  SENT,
  OUT_FOR_DELIVERY,
  READY_FOR_PICKUP,
  DELIVERED = 100,  // successful delivery process ends here

  // Unsuccessful outcomes
  CANCELED = 200,  // delivery canceled by a user
  NOT_PICKED_UP,  // the package was delivered but not picked up for too long time
  DELIVERY_FAILED,  // delivery failed not due to the users' actions 
}
