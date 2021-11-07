import { DeepPartial } from 'typeorm';

export abstract class CoreEntity {
  /**
   * @description RootEntity를 통해 cascade: true인 연관된 entity들까지 모두 update
   * @param obj 바꾸려는 데이터 Object
   * @param linkedEntity 재귀를 위해 만들었습니다. 함수 호출시, 절대 넣지 마세요
   * @returns void
   */
  update<Entity>(obj: DeepPartial<Entity>, linkedEntity?: Record<string, any>): void {
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) return;
      else if (typeof obj[key] === 'function') return;
      else if (typeof obj[key] === 'object' && Object.keys(obj[key]).length !== 0) {
        this.update(obj[key], this[key]);
      } else if (linkedEntity) {
        linkedEntity[key] = obj[key];
      } else {
        this[key] = obj[key];
      }
    });
  }
}
