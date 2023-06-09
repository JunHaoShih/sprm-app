import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { SPRMResponse } from 'src/models/SPRMResponse';
import { CreatePartDTO } from '../dtos/CreatePartDTO';
import { Part, ViewType } from '../models/Part';
import PartValidationService from '../PartValidateService';

const CreatePartStore = defineStore('createPart', {
  state: (): CreatePartDTO => ({
    number: '',
    name: '',
    isEndItem: false,
    isPhantom: false,
    viewType: ViewType.Design,
    viewSubtypeId: 1,
    sourceId: 1,
    unitId: 1,
    remarks: '',
  }),
  actions: {
    isPartValid(): boolean {
      const result = PartValidationService.checkCreatePartRules(this.$state);
      if (result) {
        Notify.create({
          message: result,
          color: 'red',
        });
        return false;
      }
      return true;
    },
    async create(): Promise<Part | null> {
      const part = await api.post('/api/Part', this.$state)
        .then((response): Part => {
          const data = response.data as SPRMResponse<Part>;
          return data.content;
        })
        .catch((error) => {
          let message = '';
          if (error.response) {
            const body: SPRMResponse<string> = error.response.data;
            message = `Error: ${body.code}, ${body.message}`;
          } else if (error.request) {
            // The request was made but no response was received
            message = 'Error: No response';
          } else {
            // Something happened in setting up the request that triggered an Error
            message = 'Something went wrong';
          }
          Notify.create({
            message,
            color: 'red',
          });
          return null;
        });
      return part;
    },
  },
});

export default CreatePartStore;
