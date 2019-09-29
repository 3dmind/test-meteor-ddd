import { ApplicationUiService } from '../../../../services/ui/ApplicationUiService'
import * as actions from '../actions'

export const {
  ActionsContext,
  useActions,
} = ApplicationUiService.createActionsContext<typeof actions>('Tasks')
