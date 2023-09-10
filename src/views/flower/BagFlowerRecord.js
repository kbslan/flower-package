export function createBagFlowerRecord(flower) {
  return new BagFlowerRecord({
    id: flower.id,
    bagId: flower.bagId,
    pickerId: flower.pickerId,
    categoryId: flower.categoryId,
    specificationId: flower.specificationId,
    damageReasonId: flower.damageReasonId,
    bagAmount: flower.bagAmount,
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

export default class BagFlowerRecord {
  constructor({ id, bagId, pickerId, categoryId, specificationId, damageReasonId, bagAmount, damageAmount, yn, creatorId, creatorName, created }) {
    this.id = id
    this.bagId = bagId
    this.pickerId = pickerId
    this.categoryId = categoryId
    this.specificationId = specificationId
    this.damageReasonId = damageReasonId
    this.bagAmount = bagAmount
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
