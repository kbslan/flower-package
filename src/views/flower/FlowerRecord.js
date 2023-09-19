export default function createFlowerRecord(flower) {
  return new FlowerRecord({
    id: flower.id,
    packageId: flower.packageId,
    pickerId: flower.pickerId,
    categoryId: flower.categoryId,
    specificationId: flower.specificationId,
    damageReasonId: flower.damageReasonId,
    packageAmount: flower.packageAmount,
    damageAmount: flower.damageAmount,
    yn: flower.yn,
    creatorId: flower.creatorId,
    creatorName: flower.creatorName,
    created: flower.created,
    modifierId: flower.creatorId,
    modifierName: flower.creatorName,
    modified: flower.created
  })
}

class FlowerRecord {
  constructor({ id, packageId, pickerId, categoryId, specificationId, damageReasonId, packageAmount, damageAmount, yn, creatorId, creatorName, created }) {
    this.id = id
    this.packageId = packageId
    this.pickerId = pickerId
    this.categoryId = categoryId
    this.specificationId = specificationId
    this.damageReasonId = damageReasonId
    this.packageAmount = packageAmount
    this.damageAmount = damageAmount
    this.yn = yn
    this.creatorId = creatorId
    this.creatorName = creatorName
    this.created = created
    this.modifierId = creatorId
    this.modifierName = creatorName
    this.modified = created
  }
}
